import { motion } from "framer-motion"

import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { fadeIn, textVariant } from "../utils/motion"
import { testimonials } from "../constants";

const FeedBackCard = ({ index, testimonial, name, designation, company, image }) => (
  <motion.div variants={fadeIn('up', 'spring', Math.log(index + 1) * 0.5, 0.75)}
    className="bg-black-200 p-10 rounded-3xl xs:w-[320px] w-full"
  >
    <p className="text-white font-black text-[48px]">"</p>
    <p
      className="text-white tracking-wider text-[18px] leading-[32px]"
    >{testimonial}</p>

    <div className="mt-7 flex justify-between items-center gap-1">
      <div className="flex-1 flex flex-col">
        <p className="text-white font-medium text-[16px]"><span className="blue-text-gradient"> @ </span>{name}</p>
        <p className="mt-1 text-secondary text-[12px]">{designation} of {company}</p>
      </div>

      <img src={image} alt={`feedback-by-${name}`} className="w-10 h-10 rounded-full object-cover" />
    </div>
  </motion.div>
)

const Feedbacks = () => {
  return (
    <div
      className="mt-12 bg-black-100 rounded-[20px]"
    >
      <div className={`${styles.padding} bg-tertiary rounded-2xl min-h-[300px]`}>
        <motion.div
          variants={textVariant()}
          className={styles.innerWidth}
        >
          <p className={styles.sectionSubText}>
            What others say
          </p>
          <h2 className={styles.sectionHeadText}>
            Testimonials
          </h2>
        </motion.div>
      </div>

      <div className={`${styles.paddingX} -mt-20 pb-14 flex flex-wrap gap-7`}>
        {testimonials.map((testimonial, index) => (
          <FeedBackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  )
}

export default SectionWrapper(Feedbacks, "feedbacks")