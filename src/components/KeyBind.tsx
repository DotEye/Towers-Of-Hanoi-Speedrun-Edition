import styled from 'styled-components';

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export const KeyBind = ({value, onChange}: Props) =>
    <Input dangerouslySetInnerHTML={{__html: value}} onKeyDown={e => {
        onChange(e.key.toLowerCase());
        e.stopPropagation();
        e.preventDefault();
    }} onChange={() => {
        // Do nothing, but make React happy that this controlled input has an onChange.
    }} contentEditable />;

const Input = styled.div`
    min-width: 10px;
    background: none;
    color: white;
    border: 2px solid white;
    padding: 0 2px;
    text-align: center;
    caret-color: transparent;
    display: inline-block;

    :focus {
        outline: none;
        background-color: #222222;
        border-color: orange;
    }
`;
