import React, { useEffect, useMemo, useRef, useState } from "react"
import Fuse from 'fuse.js'

interface Props {
    names: string[];
    onNameChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onSubmit: () => void;
}

export default function ChooseName({
    names,
    onNameChange,
    onSubmit
}: Props) {
    return (
        <>
            {/* <h1 style={styles.title}>Choisis ton nom dans la liste et laisse faire la magie !</h1> */}
            <Select onChange={onNameChange} names={names} />
            <button className="button" onClick={onSubmit}>
                laisser faire la magie
            </button>
            <p style={styles.paragraph}>et ne le dit à personne...</p>
            <img width="100%" style={styles.image} src="santa_chut.jpg" />
        </>
    )
}

interface SelectProps {
    names: string[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


function Select(props: SelectProps) {
    const [name, setName] = useState<string>('');
    const [open, setOpen] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);

    const fuse = useMemo(() => new Fuse(props.names, { includeScore: true, distance: 0.5 }), [props.names])
    const filteredNameList = useMemo(() => name ? fuse.search(name).map(el => el.item) : props.names, [name, fuse])

    function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.currentTarget.value);
    }

    function handleOpen() { setOpen(true) }
    function handleClose() { setOpen(false) }

    function handleClickOutside(event: MouseEvent) {
        if (containerRef && !containerRef.current?.contains(event.target as Node)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        if (open || name)
            window.addEventListener('mousedown', handleClickOutside)
        else
            window.removeEventListener('mousedown', handleClickOutside)
    }, [open, name])

    return (
        <div ref={containerRef} className='select' style={{ position: 'relative', margin: 'auto' }}>
            <input
                type='text'
                onChange={handleNameChange}
                onFocus={handleOpen}
            />
            <div className='select-cursor' onClick={open ? handleClose : handleOpen}>
                <span
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    className='fa fa-chevron-down'
                />
            </div>
            <ul className='list' style={{ maxHeight: open ? '150px' : 0 }}>
                {filteredNameList.map(el => <li>{el}</li>)}
            </ul>
        </div>
    )
}

const styles = {
    paragraph: {
        margin: "auto",
        marginBottom: 0,
        fontStyle: "italic"
    },
    title: {
        margin: "20px auto",
        textAlign: 'center' as any
    },
    image: {
        margin: "0 auto",
        marginBottom: "10px",
        width: window.innerWidth < 500 ? "100%" : "338px"
    },
    input: {
        fontSize: "20px",
        width: window.innerWidth < 500 ? "100%" : "50%",
        height: "30px",
        margin: "50px auto"
    }
}