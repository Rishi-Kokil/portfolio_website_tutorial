import { motion } from 'framer-motion';
import React from 'react';
import { Tilt } from 'react-tilt';
import { styles } from "../style";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion"
import { SectionWrapper } from '../hoc';

const ServiceCard = ({index , title , icon}) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div 
      variants={fadeIn("right","spring", 0.5 * index , 0.75)}
      className='w-full green-pink-gradient p-1 shadow-card rounded-[20px]'>
        <div
          options={{
            max : 45,
            scale : 1,
            speed : 450,
          }} 
          className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
            <img src={icon} alt={title} />
            <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>

      </motion.div>
    </Tilt>
  );
}
 

const About = () => {
  return (
    <>
    {/* textvariant is a utility function that we will create later */}
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Introduction</p>
        <h2 className={`${styles.heroHeadText}`}>Overview.</h2>
      </motion.div>
      <motion.p
        variants={fadeIn("" , "" , 0.1 , 1)}
        className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'>
        Detail-oriented Computer Engineering graduate from Vivekanand Education Society's Institute of Technology. Possessing a strong foundation in computer engineering and proficiency in a range of programming languages, including Java, C, and Python, and little experience with Dart and Flutter, along with expertise in web development technologies such as HTML, CSS, JavaScript, Bootstrap, Node JS, Express JS and Database languages Like MySQL. I am committed to applying my technical understanding and problem-solving skills to drive innovation and contribute to the world of Computer Technology
      </motion.p>
      <div
      className='mt-20 flex flex-wrap gap-10'>
        {services.map((ser , index)=>(
          <ServiceCard key={ser.title} index={index} {...ser} />
          // ...ser is a spred syntax to pass all the properties indside the serviceCard Component
        ))}

      </div>
    </>
  )
}

export default SectionWrapper(About , "about");