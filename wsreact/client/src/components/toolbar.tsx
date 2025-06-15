import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Type,
  TextCursorInput,
  Images,
  FrameIcon,
  Columns2,
} from "lucide-react"; // or your own icon source

function ToolbarButton() {
  const btnRef = useRef<HTMLDivElement | null>(null);
  const buttonOnlyRef = useRef<HTMLButtonElement | null>(null);

  const isDraggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  const [showToolbar, setShowToolbar] = useState(false);
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMouseDown = (event: MouseEvent) => {
    if (buttonOnlyRef.current && buttonOnlyRef.current.contains(event.target as Node)) {
      const rect = btnRef.current?.getBoundingClientRect();
      if (rect) {
        isDraggingRef.current = true;
        hasDraggedRef.current = false; // reset on down
        dragOffset.current = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        event.preventDefault();
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDraggingRef.current) {
      hasDraggedRef.current = true;
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={btnRef}
      className="fixed"
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        zIndex: 10000,
        cursor: isDraggingRef.current ? "grabbing" : "grab",
      }}
    >
      <button
        ref={buttonOnlyRef}
        type="button"
        className="floating-btn"
        onClick={(event) => {
          if (hasDraggedRef.current) return;
          event.stopPropagation();
          setShowToolbar((prev) => !prev);
        }}
      >
        <Sparkles size={20} fill="#ffffff" />
      </button>

      <Toolbar show={showToolbar} />
    </div>
  );

}

function Toolbar({ show }: { show: boolean }) {
  const tools = [
    { icon: <FrameIcon size={20} />, label: "Frame" },
    { icon: <Columns2 size={20} />, label: "Container" },
    { icon: <Type size={20} />, label: "Text" },
    { icon: <TextCursorInput size={20} />, label: "Input" },
    { icon: <Images size={20} />, label: "Images" },
  ];

  const handleDragStart = (event: React.DragEvent<HTMLButtonElement>) => {
    event.dataTransfer.setData("text/plain", "dragged-tool");
    event.dataTransfer.effectAllowed = "move";
  };


  return (
    <div
      className={`toolbar ${show ? "visible" : "hidden"}`}
      style={{
        position: "absolute",
        left: "50%",
        bottom: "calc(100% + 8px)", // 👈 Appears above the button
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "8px", // space above the button
        transition: "opacity 0.3s ease, transform 0.3s ease",
        opacity: show ? 1 : 0,
        transform: show ? "translate(-50%, 0px)" : "translate(-50%, 20px)", // animate up
        pointerEvents: show ? "auto" : "none",
      }}
    >
      {tools.map((tool, index) => (
        <button key={index} className="toolbar-button" draggable={true} onDragStart={handleDragStart} title={tool.label}>
          {tool.icon}
        </button>
      ))}
    </div>
  );
}


export default ToolbarButton;
