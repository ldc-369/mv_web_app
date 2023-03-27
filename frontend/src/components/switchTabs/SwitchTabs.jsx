import React, { useState } from 'react';
import './style.scss';

function SwitchTabs({data, onTabChange_button}) {  
    const [selectedTab_button, setSelectedTab_button] = useState(0);
    const [left, setLeft] = useState(0);


    const activeTab = (index, value)=>{
        setLeft(index*100);
        setTimeout(()=>{
            setSelectedTab_button(index);
        }, 300);
        onTabChange_button(value, index);    
    }


    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((arrElement, index)=>(    
                    <span key={index} className={`tabItem ${selectedTab_button === index?"active":""}`} onClick={()=>activeTab(index, arrElement)}>
                        {arrElement}    
                    </span>
                ))}
                <span className="movingBg" style={{left}} />
            </div>
        </div>
    );
}

export default SwitchTabs;