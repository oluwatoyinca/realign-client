
import { useMemo } from 'react'
import styles from './styles.module.css'

const CustomTable = ({viewValues = [], editableValues = [], compareValues = []}) => {
    let useSmallFont = false
    const structuredValues = useMemo(() => {
        if (viewValues.length > 0) {
          useSmallFont = true
          return viewValues
        }

        const objKeys = Object.keys(compareValues)
        if (objKeys.length == 0) return []

        const headerRow = objKeys.map(key => key.split('-').join(' '))
        let valuesArray = [headerRow]
        for(let i = 0; i < compareValues[objKeys[0]].length; i++) {
            const tempArray = objKeys.map(key => compareValues[key][i])
            valuesArray = [...valuesArray, tempArray]
        }
        return valuesArray
    }, [viewValues, compareValues])

  return (
    <>
    {structuredValues.length > 0 ?
      <table className={`${styles.table} ${useSmallFont && styles.small}`}>
        <tbody>
        {structuredValues.map((row, ind) => (
            <tr key={ind} >
                {row.map((cell, index) => ind == 0 ? <th key={index}>{cell}</th> : <td key={index}>{cell == null || cell == '' ? '-' : cell}</td> )}
                {/* Meant to enable editing of records if the table has any to edit
                {editableValues.length > 0 && <span onClcik={() => setShowEditModal(true)}>Update</span>} */}
            </tr>
        ))}
        </tbody>
      </table> : <></>}
    </>
  )
}

export default CustomTable
