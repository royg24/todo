import {useState, useContext} from "react";
import "../style/TaskBoardStyle.css"
import {BackgroundColorContext, TextColorContext} from "@/contexts/ColorContext.ts";
import ControlBar from "@/components/ControlBar.tsx";

export default function TaskBoard() {
    const [username] = useState<string>("Guest");
    const { textColor } = useContext(TextColorContext);
    const { bgColor } = useContext(BackgroundColorContext);


    return (
        <>
            <div className={"task-board-container"} style={{backgroundColor: bgColor}}>
                <h1 className="task-board-header" style={{color: textColor}}>Welcome {username}</h1>
                <ControlBar />
            </div>
        </>
    )
}