import { useCallback, useEffect, useState } from 'react'
import { useData } from '../../sdk/hooks/useData'
import './style.css'
import { useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();
    const { getCountryList, countryList, getCurrentTime } = useData()
    const [selectedCountry, setSelectedCountry] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        getCountryList()
    }, [getCountryList])

    const getTime = useCallback(async (countryList) => {
        const result = await getCurrentTime(countryList);
        setCurrentTime(result)
        setIsRunning(true);
    }, [getCurrentTime, setCurrentTime,setIsRunning])

    useEffect(() => {
        if (countryList) {
            setSelectedCountry(countryList[0]);
            if(countryList[0])
            getTime(countryList[0])
        }
    }, [countryList, getTime])

    const handleChange = useCallback((e) => {
        setSelectedCountry(e.target.value);
        getTime(e.target.value)

    }, [getTime, setSelectedCountry])

    const formatDate = useCallback((time) => {
        const date = new Date(time);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    }, [])


    useEffect(() => {
        if (currentTime) {
            let timer;
            if (isRunning) {
                timer = setInterval(() => {
                    if (currentTime) {

                        const originalDatetime = new Date(currentTime);
                        originalDatetime.setMilliseconds(originalDatetime.getMilliseconds() + 1000);
                        setCurrentTime(originalDatetime.toISOString());
                    }

                }, 1000);
            } else {
                clearInterval(timer);
            }

            return () => {
                clearInterval(timer);
            };
        }

    }, [isRunning, currentTime]);

    const handlePauseStart = () => {
        setIsRunning(!isRunning);
    };

    return (
        <div className='headerSection'>
            <button onClick={()=>navigate('/')}>Back</button>
            <div>
                <p className='countryDropdown'>Country Dropdown</p>
                <select className='select' name="country" id="country" value={selectedCountry} onChange={handleChange}>
                    {countryList.map((data, index) => (
                        <option key={index} value={data} >{data}</option>
                    ))}
                </select>

            </div>
            {currentTime && <div className="clock">{formatDate(currentTime)}</div>}
            <button onClick={handlePauseStart}>
                {isRunning ? 'Pause' : 'Start'}
            </button>

           
        </div>
    )
}