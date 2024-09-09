import React, { useEffect, useState } from 'react';

const Stopwatch = () => {
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [second, setSecond] = useState(0);
    const [stop, setStop] = useState(true);
    const [timesList, setTimesList] = useState([]);

    const onStart = () => {
        setStop(false);
    };

    const onStop = () => {
        setStop(true);
        // Menambahkan waktu ke dalam daftar setelah stopwatch dihentikan
        const formattedTime = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`;
        setTimesList((prevList) => [...prevList, formattedTime]);
    };

    const onReset = () => {
        setHour(0);
        setMin(0);
        setSecond(0);
        setStop(true);
        // Menghapus daftar waktu
        setTimesList([]);
    };

    const deleteTime = (index) => {
        // Menghapus waktu dari daftar berdasarkan index
        setTimesList((prevList) => prevList.filter((_, i) => i !== index));
    };

    useEffect(() => {
        let interval = null;

        if (!stop) {
            interval = setInterval(() => {
                setSecond((prevSecond) => prevSecond + 1);

                if (second >= 100) {
                    setSecond(0);
                    setMin((prevMin) => prevMin + 1);
                }
                if (min >= 59) {
                    setMin(0);
                    setHour((prevHour) => prevHour + 1);
                }
            }, 50); // Mengatur interval untuk setiap 1 detik
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [stop, second, min, hour]);

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='bg-yellow h-auto w-[380px] rounded-2xl border-2 border-emas shadow p-4 shadow-[0_1px_6px_8px#102250]'>
                <div className='text-center text-3xl font-bold mt-2 mb-6 h-[50px] w-[350px] flex items-center justify-center bg-white rounded-3xl shadow-[0_1px_6px_6px#102250]'>
                    {`${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${second.toString().padStart(2, '0')}`}
                </div>
                <div className='grid grid-cols-3 px-6 gap-4 mb-4'>
                    <button className='p-2 bg-blue text-white font-semibold rounded-3xl hover:bg-red transition shadow-[0_2px_8px_4px#ffffff]' onClick={onStart}>Start</button>
                    <button className='p-2 bg-green text-white font-semibold rounded-3xl hover:bg-red transition shadow-[0_2px_8px_4px#ffffff]' onClick={onStop}>Stop</button>
                    <button className='p-2 bg-red text-white font-semibold rounded-3xl hover:bg-blue transition shadow-[0_2px_8px_4px#ffffff]' onClick={onReset}>Reset</button>
                </div>
                {/* Menampilkan daftar waktu yang telah dicatat */}
                <div className='mt-6'>
                    {timesList.length > 0 ? (
                        <ul>
                            {timesList.map((time, index) => (
                                <li key={index} className='flex justify-between items-center mb-2'>
                                    <span>{time}</span>
                                    <button
                                        className='ml-4 p-1 bg-blue2 text-white rounded-3xl hover:bg-red transition  shadow-[0_2px_8px_4px#ffffff]'
                                        onClick={() => deleteTime(index)}
                                    >
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='text-center'></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
