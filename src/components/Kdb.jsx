import server from "../../server";
import { useEffect, useState } from 'react';
import { useNotification } from 'use-toast-notification'


const Kdb = () => {
  
    const [spinner, setSpinner] = useState(false)
    const [spinners, setSpinners] = useState(false)

  const [checker, setChecker] = useState(false)
  const [id, setId] = useState('')
  const [receiver, setReceiver] = useState('')
  const [cell, setCell] = useState('')
  const [email, setEmail] = useState('')
  const [sender, setSender] = useState('')
  const [from, setFrom] = useState('')
  const [destination, setDestination] = useState('')
  const [datelisted, setDatelisted] = useState('')
  const [deliverydate, setDeliverydate] = useState('')
  const [item, setItem] = useState('')
const [category, setCategory] = useState('')
    
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')


  const notification = useNotification()

    const data = {
        id: id, receiver: receiver, cell: cell,
        email: email, sender: sender, from: from,
        destination: destination, datelisted:datelisted,
        deliverydate:deliverydate, item:item ,category:category }

  async function insert() {  
      const { data:response, status:status } = await server.post(`/append`,data)
      if (response) {
          notification.show({
              message: `${id} was uploaded successful`,
              title: 'Upload Succesful',
              variant: 'success'
          })
        }else {
            notification.show({
                message: `${id} could not be uploaded succesfully`, 
                title: 'Upload failed',
                variant: 'error'
            })
      }
      console.log(status)
      return response;
    }
  
  async function login(username,password) {
      const { data: response } = await server.post("/login", {
          username: username,
          password:password
      })
      if(response){
          setChecker(true)
      } else {
          setSpinners(false)
      }
  }



  useEffect(()=>{
    async function output(){
    if(checker){
      document.getElementById('upload').style.display = 'block'
      document.getElementById('login').style.display='none'  
    }else{
      document.getElementById('upload').style.display = 'none'
      document.getElementById('login').style.display='block'  
    }} output()
  },[checker])
  
  return (
      <div>
         
<section className="bg-gray-50 dark:bg-gray-900" id="login">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Novastrans, we invest in the world’s potential</h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Novastrans we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Read more about our app 
                <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
        <div>
            <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Admin dashboard
                </h2>
                <form className="mt-8 space-y-6" action="#">
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input  name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Admin" required/>
                    </div>
                    <div>
                        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required/>
                        </div>
                        <div className="ml-3 text-sm">
                        <label  className="font-medium text-gray-500 dark:text-gray-400">Remember this device</label>
                        </div>
                        < a href = "/insert" className="ml-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Lost Password?</a>

                </div>
                <button type="button" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                  setSpinners(true)
                    await login(username,password)
                              }}>
                                {spinners ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Log in"
                        )}</button>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Not registered yet? <a className="text-blue-600 hover:underline dark:text-blue-500">Create account</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
{/**-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}
   
   
   
   
   
   
      <div className="m-6" id="upload"> 
        <div>
          <p className="text-3xl text-center mb-6 font-mono font-bold">Upload to Database</p>
        </div>        
<form>
    <div className="grid gap-6 mb-6 md:grid-cols-2">
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package ID:</label>
              <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="pkg-786534" required value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receivers Name:</label>
            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jane Doe" required value={receiver} onChange={(e) => setReceiver(e.target.value)}/>
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Receivers Email:</label>
            <input type="email" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="jane@icloud.com" required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>  
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recievers Phone number:</label>
            <input type="tel" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+1 (123)-45-678" required value={cell} onChange={(e) => setCell(e.target.value)}/>
        </div>
        <div>
            <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senders Name:</label>
            <input type="text" id="website" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required value={sender} onChange={(e) => setSender(e.target.value)}/>
        </div>
        <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senders Address:</label>
            <input type="text" id="visitors" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="65 Czehk Dnipro, Ukraine" required value={from} onChange={(e) => setFrom(e.target.value)}/>
        </div>
    </div>
    <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Destination address:</label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="234 Oak Avenue New Jersey, United States" required value={destination} onChange={(e) => setDestination(e.target.value)}/>
    </div> 
    <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date Sent:</label>
        <input type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="27/10/2000" required value={datelisted} onChange={(e) => setDatelisted(e.target.value)}/>
    </div> 
    <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Delivery Date:</label>
        <input type="text" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="30/12/2021" required value={deliverydate} onChange={(e) => setDeliverydate(e.target.value)}/>
    </div> 
    <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Package:</label>
        <input type="text" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Undisclosed" required value={item} onChange={(e) => setItem(e.target.value)}/>
    </div> 
    <div className="mb-6">
        <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category:</label>
        <input type="text" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Precious" required value={category} onChange={(e) => setCategory(e.target.value)}/>
    </div> 
    <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required/>
        </div>
        <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
    </div>
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={async () => {
                    setSpinner(true)                      
                    await insert() &&
                        setSpinner(false)
                        console.log("clicked")           
                  }}>
                      {spinner ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            "Submit"
                        )}</button>
</form>
</div>
   
   
   
   
   
   
   
   
   
   
</div>
  )
}

export default Kdb
