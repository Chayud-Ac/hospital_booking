import Doctor from "../models/DoctorSchema.js";
import User from "../models/DoctorSchema.js";
import Appointment from "../models/AppointmentSchema.js";
import getNextDateForDay from "../utils/getNextDateForDay.js";

// Create a new appointment
export const createAppointment = async (req, res) => {
  const userId = req.userId; // Get userId from req (set by authenticate middleware)
  console.log(userId);

  try {
    const { ticketPrice, timeSlot, doctor } = req.body;
    const [day, timeRange] = timeSlot.split(" ");

    // Generate appointmentDate based on the timeSlot
    const appointmentDate = getNextDateForDay(day, timeRange);

    // Find the doctor and update the availability of the time slot
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

    // Create the appointment
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

    // Add the appointment to the doctor's appointments array
    doctorData.appointments.push(savedAppointment._id);
    await doctorData.save();

    res.status(201).json({ success: true, data: savedAppointment });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("doctor user");
    res.status(200).json({ success: true, data: appointments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// get single appointment for user when they are request for their booking
export const getAppointmentsForUser = async (req, res) => {
  const userId = req.userId; // Get userId from req (set by authenticate middleware)

  try {
    // Find appointments for the user and populate only the necessary fields of the doctor
    const appointments = await Appointment.find({ user: userId })
      .populate({ path: "doctor", select: "-password" }) // Exclude the password field
      .select("appointmentDate doctor");

    // Map the response to include the doctor object and appointment date
    const response = appointments.map((appointment) => ({
      doctor: appointment.doctor,
      appointmentDate: appointment.appointmentDate,
    }));

    res.status(200).json({ success: true, data: response });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete an appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Find the doctor and update the availability of the time slot
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

    await appointment.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
