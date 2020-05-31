import React, { useState }  from 'react'
import styles from './Subscribe.module.scss'
import config from '../../data/SiteConfig'

const addSubscriber = (email, name) => {
    fetch('https://www.getrevue.co/api/v2/subscribers', {
        method: 'POST',  
        mode: 'cors', 
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Authorization': 'Token bgGedS2X6DKG26NZNXzHSZE2IciMOae2',
            'Access-Control-Allow-Origin': 'localhost:8000',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": "aparna.joshi@gmail.com",
            "double_opt_in": true
        })
    })
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        console.log(err)
    })
}

const Subscribe = () => {
 const [emailValue, setEmail] = useState("");
 const [nameValue, setName] = useState("");

  return(
    <div className={styles.subscribeContainer} id="revue-embed">
      <img
        className={styles.avatar}
        src={config.userAvatar.replace("static", "")}
        alt={config.userName}
      />
      <div className={styles.subscribeTitle}>
        <h4 className={styles.subscribeHead}>Newsletter</h4>
        <h2 className={styles.subscribeMsg}>Subscribe to my mailing list</h2>
      </div>
      <div className={styles.subscribeForm}>
        <form
          action="https://www.getrevue.co/profile/aparnajoshi/add_subscriber" 
          method="post" 
          id="revue-form" 
          name="revue-form" 
          target="_blank"
        >
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
          <input className={styles.subscribeButton} type="submit" value="Subscribe" name="member[subscribe]" id="member_submit" />
        </form>
      </div>  
    </div>
)
  }

export default Subscribe
