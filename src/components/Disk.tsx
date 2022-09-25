import styled from 'styled-components';

interface Props {
    $width: number;
    $height: number;
    $color: number;
    $holding?: boolean;
}

export const Disk = styled.div.attrs<Props>(({$color, $width, $height}) => ({
    // If these were set normally in the CSS below, over 200 classes
    // would be generated for each color/width/height combination.
    style: {
        backgroundColor: `hsl(${$color * 360}, 100%, 50%)`,
        width: `${$width}px`,
        height: `${$height}px`,
    }
}))<Props>`
    border-radius: 10px;
    margin: ${p => p.$holding ? '20px' : 'auto'} auto auto auto;
    font-size: ${p => p.$height - 10}px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
`;
