import React, { useState }  from 'react'
import styles from './Subscribe.module.scss'
import config from '../../data/SiteConfig'

const Subscribe = () => {
  const [emailValue, setEmail] = useState("");
  const [nameValue, setName] = useState("");
  const [returnMessage, setReturnMessage] = useState("");

  const addSubscriber = (email, name) => {
    fetch('https://aparnajoshi.netlify.app/.netlify/functions/index', {
        method: 'POST',  
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "email": email,
            "name": name
        })
    })
    .then(() => {
        setReturnMessage(`The email: ${emailValue} has been added to subscribers list. Please confirm your subscription`);
        setEmail("");
        setName("");
    })
    .catch((err) => {
        console.log(err)
    })
  }

  return(
    <div className={styles.subscribeContainer} id="revue-embed">
      <img
        className={styles.avatar}
        src={config.userAvatar.replace("static", "")}
        alt={config.userName}
      />
      <div className={styles.subscribeTitle}>
        <h4 className={styles.subscribeHead}>        
          <a href="https://www.getrevue.co/profile/aparnajoshi/" target="_blank" rel="noopener noreferrer"><strong>Newsletter</strong></a>
        </h4>
        <h2 className={styles.subscribeMsg}>Subscribe to my mailing list</h2>
      </div>
      <div className={styles.subscribeForm}>
          <input 
            placeholder="Email" 
            type="email" 
            name="member[email]" 
            id="member_email"
            value={emailValue}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            placeholder="First name (Optional)" 
            type="text" 
            name="member[first_name]" 
            id="member_first_name" 
            value={nameValue}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={() => addSubscriber(emailValue, nameValue)} className={styles.subscribeButton} type="submit" name="member[subscribe]" id="member_submit">Subscribe</button>
      </div>
      <div className={styles.return}>{returnMessage}</div>  
    </div>
)
  }

export default Subscribe
