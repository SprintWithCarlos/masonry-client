import {motion} from 'framer-motion'

export const Bouncing = ({dimensions, color, backgroundColor}) => {
    const bouncing = {
        height: parseInt(dimensions.height),
        width: parseInt(dimensions.width),
        backgroundColor,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
    const circle ={
        width: parseInt(dimensions.size),
        height: parseInt(dimensions.size),
        backgroundColor: color,
        borderRadius: "50%",
        display: 'block'
    }
    const bouncingVariants ={
        start: {
            transition: {
                staggerChildren: 0.1
            }
        },
        end: {
            transition: {
                staggerChildren: 0.2
                        }
        }

    }
    const circleVariants ={
        start: {
            y: '0%',
        }, 
        end:{
            y: '50%',
        }
    }
    const circleTransition ={
        duration: 0.4,
        yoyo: Infinity,
        ease: 'easeInOut'
    }
    return (
        <motion.div style={bouncing} variants={bouncingVariants} initial="start" animate="end">
            <motion.span style={circle} variants={circleVariants} transition={circleTransition}/>
            <motion.span style={circle} variants={circleVariants} transition={circleTransition}/>
            <motion.span style={circle} variants={circleVariants} transition={circleTransition}/>
        </motion.div>
    )
}
