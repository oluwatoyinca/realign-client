
import { useState } from 'react'

const UpdateModal = ({fieldsToUpdate, modalLabel, onUpdate, showModal, setShowModal}) => {
    const [fieldValues, setFieldValues] = useState({})
    const closeModal = () => {
        fieldsToUpdate.forEach(el => setFieldValues({...fieldValues, [el]: ''}))
        setShowModal(false)
    }
// this modal is meant to pop up to allow update on records in View Tables,
// unfortunately, i could not complete it in time.
  return (
    (showModal == true) ?
    (<div>
        <form>
            <span>Update {modalLabel} record</span>
            {fieldsToUpdate.map(el => <>
                <label>{el}</label>
                <input placeholder={el} type='text' value={fieldValues[el]} onChange={e => setFieldValues({...fieldValues, [el]: e.target.value})}/>
            </>)}
            <button type="button"  onClick={() => {
                onUpdate(fieldValues)
                closeModal()
                }}>Update</button>
            <button type="button" onClick={closeModal}>Cancel</button>
        </form>
    </div>) : null
  )
}

export default UpdateModal
