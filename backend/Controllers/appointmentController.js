import Doctor from "../models/DoctorSchema.js";
import User from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import getNextDateForDay from "../utils/getNextDateForDay.js";

export const createAppointment = async (req, res) => {
  const userId = req.userId;
  console.log(userId);

  try {
    const { ticketPrice, timeSlot, doctor } = req.body;
    const [day, timeRange] = timeSlot.split(" ");

    const appointmentDate = getNextDateForDay(day, timeRange);

    const doctorData = await Doctor.findById(doctor);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const slotIndex = doctorData.timeSlots.findIndex(
      (slot) => slot.time === timeSlot
    );
    if (slotIndex === -1) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot not available" });
    }

    if (!doctorData.timeSlots[slotIndex].available) {
      return res
        .status(400)
        .json({ success: false, message: "Time slot already booked" });
    }

    doctorData.timeSlots[slotIndex].available = false;
    await doctorData.save();

    const appointment = new Appointment({
      doctor: doctor,
      user: userId,
      ticketPrice,
      appointmentDate,
      timeSlot,
      status: "pending",
      isPaid: true,
    });

    const savedAppointment = await appointment.save();

    doctorData.appointments.push(savedAppointment._id);
    await doctorData.save();

    const userData = await User.findById(userId);
    if (userData) {
      userData.appointments.push(savedAppointment._id);
      await userData.save();
    }

    res.status(201).json({ success: true, data: savedAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: { $in: ["pending", "approved"] },
    })
      .populate({ path: "doctor", select: "name _id" })
      .populate({ path: "user", select: "name _id" })
      .select("appointmentDate timeSlot status isPaid");

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAppointmentsForUser = async (req, res) => {
  const userId = req.userId;

  try {
    const appointments = await Appointment.find({ user: userId })
      .populate({ path: "doctor", select: "-password" })
      .select("appointmentDate doctor");

    const response = appointments.map((appointment) => ({
      doctor: appointment.doctor,
      appointmentDate: appointment.appointmentDate,
    }));

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    const doctorData = await Doctor.findById(appointment.doctor);
    if (!doctorData) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    const slotIndex = doctorData.timeSlots.findIndex(
      (slot) => slot.time === appointment.timeSlot
    );
    if (slotIndex !== -1) {
      doctorData.timeSlots[slotIndex].available = true;
      await doctorData.save();
    }

    doctorData.appointments = doctorData.appointments.filter(
      (id) => id.toString() !== appointment._id.toString()
    );
    await doctorData.save();

    const userData = await User.findById(appointment.user);
    if (userData) {
      userData.appointments = userData.appointments.filter(
        (id) => id.toString() !== appointment._id.toString()
      );
      await userData.save();
    }

    await appointment.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const UpdateAppointments = async (req, res) => {
  const appointments = req.body;

  try {
    const bulkOps = appointments.map((appointment) => ({
      updateOne: {
        filter: { _id: appointment._id },
        update: {
          status: appointment.status,
          isPaid: appointment.isPaid,
        },
      },
    }));

    await Appointment.bulkWrite(bulkOps);

    for (const appt of appointments) {
      if (appt.status === "cancelled" || appt.status === "completed") {
        const doctor = await Doctor.findById(appt.doctor);
        if (doctor) {
          const slotIndex = doctor.timeSlots.findIndex(
            (slot) => slot.time === appt.timeSlot
          );
          if (slotIndex !== -1) {
            doctor.timeSlots[slotIndex].available = true;
            await doctor.save();
          }
        }
      }
    }

    res
      .status(200)
      .json({ success: true, message: "Appointments updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistoryAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      status: { $in: ["cancelled", "completed"] },
    })
      .populate({ path: "doctor", select: "name _id" })
      .populate({ path: "user", select: "name _id" })
      .select("appointmentDate timeSlot status isPaid");

    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
