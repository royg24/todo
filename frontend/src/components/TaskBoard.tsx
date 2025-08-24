import {useState, useContext} from "react";
import "../style/TaskBoardStyle.css"
import { ThemeContext } from "@/contexts/ColorContext.ts";
import ControlBar from "@/components/ControlBar.tsx";
import TaskCard from "@/components/TaskCard.tsx";
import {TaskStatus} from "@/components/Utils.ts";

export default function TaskBoard() {
    const [username] = useState<string>("Guest");
    const { textColor } = useContext(ThemeContext);
    const { bgColor } = useContext(ThemeContext);


    return (
        <>
            <div className={"task-board-container"} style={{backgroundColor: bgColor}}>
                <h1 className="task-board-header" style={{color: textColor}}>Welcome {username}</h1>
                <ControlBar />

                <div style={{width:"60%"}}>
                    <TaskCard
                        name="Buy Groceries"
                        description="Buy milk, eggs, and bread from the supermarket."
                        status={TaskStatus.CANCELLED}
                        dueDate={new Date("2027-10-01")}
                    />
                </div>
            </div>
        </>
    )
}