import { Button } from "@/components/ui/button.tsx";
import { useContext, useState, forwardRef } from "react";
import { ThemeContext } from "@/contexts/ColorContext.ts";

interface ButtonProps {
  buttonText?: string;
}

const TodoButton = forwardRef<HTMLButtonElement, ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ buttonText, ...props }, ref) => {
    const { buttonColor, hoverButtonColor } = useContext(ThemeContext);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    return (
      <Button
        ref={ref}
        variant="outline"
        className="control-bar-button"
        style={{
            backgroundColor: isButtonHovered ? hoverButtonColor : buttonColor,
            borderColor: "transparent",
            color: "white",
            outline: 'none',
        }}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        {...props}
      >
        {buttonText ?? props.children}
      </Button>
    );
  }
);

TodoButton.displayName = "TodoButton";
export default TodoButton;
