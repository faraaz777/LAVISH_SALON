import img from "../assesst/booking.png";

export default function BookingForm() {
  return (
    <>
      <section className="w-full h-screen  text-white flex items-center justify-center">

      <div className={`w-2/5  wx-auto h-screen `} style={{ backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      </div>
      <div className="w-3/5 h-screen  text-black flex justify-center items-center  ">
<div className="w-2/5 h-3/5 bg-black rounded-3xl"> 
{/* add form here */}
</div>  
      </div>
      </section>


    </>
  );
}
