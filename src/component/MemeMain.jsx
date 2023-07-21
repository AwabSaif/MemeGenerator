import React , { useState ,useEffect} from 'react'



export default function MemeMain() {

    function greeting() {
        const date = new Date()
        const hours = date.getHours()
        
        let timeOfDay
        if(hours >= 4 && hours < 12) {
            timeOfDay = "morning"
        } else if(hours >= 12 && hours < 17) {
            timeOfDay = "afternoon"
        } else if(hours >= 17 && hours < 20) {
            timeOfDay = "evening"
        } else {
            timeOfDay = "night"
        }
        
        return `Good ${timeOfDay}`
    }
    const [meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg" 
    })
    const [allMemes, setallMemes] = useState([])

    useEffect( ()=>{
        async function getMemes(){
         const res = await  fetch("https://api.imgflip.com/get_memes")
         const data =await res.json()
         setallMemes(data.data.memes)
        }
        getMemes()
        return
        
    },[])
    
    
    
    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
        
    }
    
    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }

return (
    

         <main>
            <h3>{greeting()}</h3>
            <div className="form">
                <input 
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main> 
    )
}