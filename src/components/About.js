import React from 'react'
import Subscribe from './Subscribe'
import AboutHead from './AboutHead'
import styles from './About.module.scss'


const About = () => (
  <div className={styles.aboutWrapper}>
    <AboutHead />
    <div>
        <h2>What do I generally do?</h2>
        <p>
        Hi there, My name is Aparna Joshi. 
        I am a software engineer based out of Bangalore. 
        I completed my Bachelor`s in Information Science from RVCE.
        </p>
        <p>
        I enjoy working with front-end technologies. Though I am supposed to be a coding alien 👽, 
        I share an immense passion for physics and mathematics.  
        I blog about concepts related to science, technology, programming and psychology.
        </p>
    </div>
    <div>
      <h2>Some more random stuff about me 😉</h2>
        <p>
          I am a huge anime fan. I get mind-numbingly addicted to a new series and 
          live my life in the virtual world until I finish watching it. 
        </p>
        <p>
          Some people sing, some people dance, I, on the other hand, sketch like I am in France.
          Follow me on <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/sketch_with_katana/">Instagram</a>.
          I also go by the name `Miss.Katana` online. 
        </p>
        <p>
          I am a great advocate of sports and fitness. Though I try not to count every calorie I eat,
          I try to maintain a healthy diet and regular workouts.
          Last but not the least, I love coffee. DM me with the details given below and I would love 
          to chat with you over a cup of coffee.
        </p>
    </div>
    <div>
      <h2>Get in touch with me 🙋‍♀️</h2>
      <ol>
        <li>
          <a href="https://twitter.com/aparna_joshi_" target="_blank" rel="noopener noreferrer"><strong>Twitter: 🕊️ </strong></a>
          If you`ve got a short question or message, please tweet <a href="https://twitter.com/aparna_joshi_" target="_blank" rel="noopener noreferrer">@aparna_joshi_</a> and I`ll get back to you as soon as I can.
        </li>
        <li>
          <a href="mailto:aparnajoshi.88@gmail.com"><strong>Email: 📧</strong></a>
          If you have any longer questions or suggestions for my upcoming articles, please email me.
          I will get back to you over the weekend.
        </li>
        <li>
          <a href="https://github.com/AparnaJoshi007/"><strong>Github: 🤖</strong></a>
          I am not very active on Github except for office related work. However, if you have any interesting projects and want to collaborate with me 
          to develop front-end, I will be more then happy to help.
        </li>
        <li>
           If you are my friend or a formal acquaintance, please meet me in person, I wouldn`t mind having a cup of coffee with you
           😛
        </li>
      </ol>
    </div>
    <Subscribe />
    <ul className={styles.footerDetails}>
      <li className={styles.footerList}>
        <div>WORK</div>
        <span>Citrix R&D India Pvt Ltd.</span>
      </li>
      <li className={styles.footerList}>
        <div>EDUCATION</div>
        <span>B.E in Information Science, RVCE.</span>
      </li>
    </ul>
  </div>
)

export default About
