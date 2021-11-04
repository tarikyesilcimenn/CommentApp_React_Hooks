import React from "react";
import { useState } from "react/cjs/react.development";
import { Button, Modal } from "semantic-ui-react";
import { api } from "../api";

const SilModal = ({ yazi, push }) => {
    const [open, setOpen] = useState(false);
    const [hata, setHata] = useState("")
    const show = () => { setOpen(true) };
    const close = () => { setOpen(false) };

    const handleDelete = (id) => {
        api()
            .delete(`/posts/${id}`)
            .then(() => {
                setHata("");
                //modal close
                close();
                //push to home
                push(`/`);
            }).catch(() => {
                setHata("Yazıyı silerken bir hata oluştu.")
            })
    }
    return (<React.Fragment>
        <Button color="red" onClick={show}>Sil</Button>
        <Modal size="mini" open={open} onClose={close}>
            <Modal.Header>Yazıyı Sil</Modal.Header>
            <Modal.Content>
                <p>{yazi.title} başlıklı yazıyı silmek istediğinize emin misiniz ?</p>
                {hata && <p>{hata}</p>}
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={close}>İptal Et</Button>
                <Button positive icon="delete" labelPosition="right" content="Evet,Sil !" onClick={()=>handleDelete(yazi.id)}></Button>
            </Modal.Actions>
        </Modal>
    </React.Fragment>)

}
export default SilModal;