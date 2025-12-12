import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('')
  const [invalidInputMsg, setInvalidInputMsg] = useState('')

 const handleConnect = (e) => {
    e.preventDefault(); // prevent form submission
    // trim spaces
    const trimmedChannelName = channelName.trim()
    
    // validate input: make sure channelName is not empty
    if (trimmedChannelName === '') {
      setInvalidInputMsg("Channel name can't be empty.") // show warning
      setChannelName('') // resets channel name value in case user entered blank spaces 
      return;
    } 
  
    navigate(`/room/${trimmedChannelName}`)
  }
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <form onSubmit={handleConnect} className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Agora Video Call</h1>
          <p className="text-gray-400">Enter a channel name to start</p>
        </div>
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
          <input 
            id="channelName"
            type='text'
            placeholder='Channel Name'
            value={channelName}
            onChange={(e) => {
              setChannelName(e.target.value)
              setInvalidInputMsg('') // clear the error message
            }}
            className="w-full px-4 py-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit"
            className="w-full px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all"
          >
            Connect
          </button>
          { invalidInputMsg && <p className="mt-4 text-red-400 text-sm text-center"> {invalidInputMsg} </p>}
        </div>
      </form>
    </div>
  );
}
