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
                    <TaskCard
                        name="Finish Project"
                        description="Complete the final report and presentation for the project."
                        status={TaskStatus.IN_PROGRESS}
                        dueDate={new Date("2027-09-15")}
                    />
                    <TaskCard
                        name="Book Flight"
                        description="Book a flight to New York for the business trip."
                        status={TaskStatus.COMPLETED}
                        dueDate={new Date("2027-08-20")}
                    />
                    <TaskCard
                        name="Rent a car"
                        description="Rent a car for a 3 people 5 days trup"
                        status={TaskStatus.PENDING}
                        dueDate={new Date("2028-02-13")} />
                </div>
            </div>
        </>
    )
}