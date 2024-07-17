# FoodOrderApplication

โปรเจคนี้เป็น project-base learning ที่ทำเกี่ยวกับ application การนัดนัดพบแพทย์ โปรเจคนี้ทำมาเพื่อฝึกสกิลในการทำทั้ง frontend และ backend โดยใช้ stack ที่ประกอบไปด้วย (javascript , react , tailwind ,css , mongoDB , express , nodeJS)
สามารถรับชมตั้วโปรเจคได้ live server เนื่องจากผมเช่า server แบบฟรี ระบบหลังบ้านอาจจะทำการ response ข้อมูลของหมอช้าหน่อยนะครับ ( เป็นแค่ตอนเข้าหน้า live server ครั้งแรก )
live server : (https://hospital-booking-frontend.onrender.com)


## Features

### User Features

- **Sign Up**: user สมัครใช้งานกรอกข้อมูลส่วนตัว
- **Login**: user เข้าใช้งานได้ตามข้อมูลที่สมัคร
- **Appointment** : user สามารถเลือกแพทย์ที่ต้องการจะปรีกษาและเลือกเวลานัดตามที่ระบบ admin ตั้งไว้ได้
- **Reviews**: user สามารถให้ Feedback กับหมอเพื่อโชว์หน้า website ได้
- **Track appointment**: user สามารถดู เวลานัดของตนเองที่ได้ทำการนัดไว้ได้

### Admin Features

- **Track appointments**: admin สามารถดู เวลานัดปัจจุบัน หรือ ประวัติการนัดได้
- **Create Doctor**: admin สามารถสร้าง account แพทย์ และกรอกข้อมูลต่างๆได้ (ข้อมูลส่วนตัว การศึกษา ประวัติการทำงาน ช่วงเวลาในการ consult )
- **Update Status**: admin สามารถ update สถานะต่างๆของ appointment


### Doctor Features

- **Track appointments**: Doctors สามารถดู ตารางนัดที่ได้มีทำการนัดเข้ามาของตนเองได้ (วันเวลานัด สถานะ ผู้ป้วย )
- **Updated**: อัปเดทข้อมูลส่วนตัว


## Project Structure

โปรเจคนี้ก็แบ่งเป็น 2 ส่วน

1. **Frontend**: ฝั่ง frontend โชว้หน้า UI ของตัว web หน้า page ต่างๆ และรวมถึงตัว admin dashboard , doctor dashboard 
3. **Backend**: ฝั่ง bakend ไว้สร้าง api เพื่อรอรับ request action ต่างๆที่มาจาก frontend (get , post ,put ,delete) และเชื่อต่อกับ database โดยใช้ mongoDB



# Setup the Project

## mongoDB
เรื่ม setup โดยสร้างฐานข้อมูลโดยใช้ mongo atlas และเอาตัว api key เพื่อมาเชื่อกับ bakend ของเรา
สามารถสมัครใช้งานได้ที่เว็ป https://www.mongodb.com/


## frontend setup and start
เปลี่ยน ไฟล์ config ให้ใช้ตัว URL backend *** 
```bash
cd frontend/
npm install
npm run dev
```
สร้าง ไฟล์ .env เก็บ key ของ cloudify เราใช่ clodify ในการเก็บรูปภาพของ user กับ doctor สมัครใช้งานได้ที่ cloudify แล้วเอาตัว parameter มาใส่ใน env ได้เลย
```bash
VITE_CLOUND_NAME=xxxxxxxxx
VITE_UPLOAD_PRESET=xxxxxxxxx
```


## backend setup and start

```bash
cd backend/
npm install
npm start
```

## backend setup and start
สร้าง ไฟล์ .env เก็บ key ของ JWT_SECRET , MONGO_URL ที่ได้มาหลังสร้างฐานข้อมูล , set PORT 
```bash
PORT=xxxx
MONGO_URL=xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
```
```bash
cd backend/
npm install
npm run server
```

```bash
cd backend/
node middleware/createSuperadmin.js
```
## admin

email : admin@gmail.com
password : 123123





