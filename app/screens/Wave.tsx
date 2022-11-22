import React, { FC } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { WaveString } from "@mechanics";

export const Wave: FC = () => {
    const canvas = React.useRef<HTMLCanvasElement & { align: string }>(null);
    const colorMode = useColorModeValue("rgba(28, 28, 27)", "rgba(0, 0, 0)");

    React.useEffect(() => {
        const context = canvas.current?.getContext("2d");
        if (canvas.current && context) {
            const wave = new WaveString({
                points: 100,
                canvas: canvas.current,
                context,
                fillStyle: colorMode,
                strokeStyle: "blue",
                mode: "DRAG_CENTER"
            });

            wave.draw();
        }

    }, [canvas.current, colorMode]);

    return (
        <Box
            width={"100%"}
            as={"canvas"}
            ref={canvas}
            _hover={{
                cursor: "grab"
            }}
        >
        </Box>
    );
};

