import React, { FC } from "react";
import { Box } from "@chakra-ui/react";

export const Wave: FC = () => {
    const elementRef = React.useRef(null);
    const initialState = {
        isDragging: false,
        mode: "MOVE_LEFT_END",
        mouseY: 0,
        mouseX: 0
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [state, update] = React.useReducer<(state: typeof initialState, updates: Partial<typeof initialState>) => typeof initialState>(
        (state, updates) => {
            return {
                ...state,
                ...updates
            };
        }, initialState
    );

    React.useEffect(() => {
        addEventListener("mousemove", (e) => {
            update({
                mouseX: e.clientX,
                mouseY: e.clientY
            });
        });
        addEventListener("mousedown", () => {
            update({
                isDragging: true
            });
        });
        addEventListener("mouseup", () => {
            update({
                isDragging: false
            });
        });
        // addEventListener("resize", (e) => {
        //     update({
        //         mouseX: e.clientX,
        //         mouseY: e.clientY
        //     });
        // });

    }, []);

    return (
        <Box
            ref={elementRef}
            // width={[200, 460, 660]}
            width={"100%"}
            as={"canvas"}
        >
        </Box>
    );
};

