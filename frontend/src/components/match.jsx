import { motion } from 'framer-motion';
import "./match.css"
const MatchPopup = ({ match, onClose, onEndSwiping }) => {
    if (!match) return null;

    return (
        <div className="bckg fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
            <motion.div 
                className="bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 rounded-2xl p-8 
                            text-center shadow-2xl w-[50vw] border-4
                            border-purple-600 flex-col gap-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
            >   <div>                
                    <h2 className="text-4xl font-bold text-purple-200 mb-6">It's a Match!</h2>
                </div>

                <motion.div
                    className="flex justify-center mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <img
                        src={match.imgURL}
                        alt={match.movieTitle}
                        className="w-80 h-80 object-cover rounded-lg border-4 border-purple-500 shadow-lg"
                    />
                </motion.div>

                <div>
                    <p className="text-lg text-purple-100 mb-8">
                        You and another user matched on <strong className="text-white">{match.movieTitle}</strong>!
                    </p>

                </div>

                

                <div className="flex justify-around">
                    <button
                        className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition"
                        onClick={onClose}
                    >
                        Keep Swiping
                    </button>
                    <button
                        className="px-6 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition"
                        onClick={onEndSwiping}
                    >
                        End Swiping
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default MatchPopup;
