import React from 'react'
import { Participant } from '../types/Participant';

interface Props {
    picked: Participant
}

export default function PickedName({ picked }: Props) {
    return (
        <>
            <h1 style={{ textAlign: "center", margin: "0 auto", marginTop: "20px" }}>Le pere Noël t'as attribué :</h1>
            <p style={{
                margin: "auto",
                fontSize: "60px",
                fontWeight: "bold",
                color: "red",
            }}>{picked.name} !</p>

            <p style={styles.paragraph}>ne {picked.gender === "male" ? "le" : "la"} déçoit pas ;)</p>
            <img width={window.innerWidth < 500 ? "100%" : "338px"} style={styles.image} src="santa.jpg" />
        </>
    )
}

const styles = {
    paragraph: {
        margin: "auto",
        marginBottom: 0,
        fontStyle: "italic"
    },
    image: {
        margin: "0 auto",
        marginBottom: "10px",
        width: window.innerWidth < 500 ? "100%" : "338px"
    }
}
