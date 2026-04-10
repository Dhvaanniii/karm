
import logo from '../assets/images/BrightWeb.png';

export default function Logo({ src = logo, logocss, sidebarlogo }) {
    return (
        <div>
            <img 
                src={src} 
                alt="Logo" 
                className={`${logocss ? "w-[253px] h-[35px] ps-[60px]" : sidebarlogo ? "w-[162px]" : ""} dark:brightness-110 dark:contrast-125 transition-all duration-300`} 
            />
        </div>
    );
}
