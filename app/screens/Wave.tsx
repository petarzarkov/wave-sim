import React, { FC } from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { WaveString } from "@mechanics";

export const Wave: FC = () => {
    const canvas  = React.useRef<HTMLCanvasElement & { align: string }>(null);
    const color = useColorModeValue("primary.900", "primary.300");
    const colorInverse = useColorModeValue("primary.300", "primary.900");

    console.log({
        color,
        colorInverse
    });
    React.useEffect(() => {
        const context = canvas.current?.getContext("2d");
        if (canvas.current && context) {
            const wave = new WaveString({
                points: 100,
                canvas: canvas.current,
                context,
                fillStyle: "linear(to-l, #7928CA, #FF0080)",
                strokeStyle: "red",
                mode: "DRAG_CENTER"
            });

            wave.draw();
        }

    }, [canvas.current]);

    return (
        <Box
            width={"100%"}
            as={"canvas"}
            ref={canvas}
        >
        </Box>
    );
};

