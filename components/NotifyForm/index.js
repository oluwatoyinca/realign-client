import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import isEmail from 'validator/lib/isEmail';

import { triggerEvent } from '../../utils/gtmHelpers'
import { fetchData } from '@/utils/apiHelpers';
import styles from './styles.module.css'

const PRODUCT_CHOICE = {
    'passion_test': 'Passion Test', 
    'talent_test': 'Talent Test'
}

const NotifyForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [choiceTest, setChoiceTest] = useState(Object.keys(PRODUCT_CHOICE)[0])

    const searchParams = useSearchParams()
    const utm_campaign = searchParams.get("utm_campaign")

    const formIsValid = name.length > 1 && isEmail(email) && Object.keys(PRODUCT_CHOICE).includes(choiceTest)

    const clearFields = () => {
        setName('')
        setEmail('')
        setChoiceTest(Object.keys(PRODUCT_CHOICE)[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formIsValid) {
            const checkResponse = await fetchData('get', `conversions?email=${email}&product_choice=${choiceTest}`)
            if(checkResponse.status == 200) {
                const checkResponseJson = await checkResponse.json()
                if (checkResponseJson.data.length > 0) {
                    alert(`We appreciate you enthusiasm ${name}! We already have your submission to be notified of this product's lunch!`)
                    clearFields()
                    return
                }
            }
            
            const response = await fetchData('post', 'conversions', {name, email, product_choice: choiceTest})
            if(response.status == 201) {
                triggerEvent({
                    action: 'gtm.formSubmit',
                    category: 'LaunchNotificationSub',
                    label: 'text',
                    values: { name, email, product_choice: choiceTest, utm_campaign },
                })
                alert(`Thank you for your submission ${name}! We will be sure to let you know when the ${PRODUCT_CHOICE[choiceTest]} launches!`)
            }
            else alert(`We apologize that your submission was not successful. Please try again soon!`)
            clearFields()
        }
    }

    return (
        <>
            <form className={styles.form}>
                <span>Be the first to know when we launch!</span>
                <label>Full Name</label>
                <input placeholder='Full Name' type='text' value={name} onChange={e => setName(e.target.value)}/>
                <label> Email Address</label>
                <input placeholder='Email Address' type='email' value={email} onChange={e => setEmail(e.target.value)}/>
                <label>Which test are you interested in?</label>
                <select
                value={choiceTest}
                onChange={(e) => setChoiceTest(e.target.value)}
                className={``}
                >
                    {Object.keys(PRODUCT_CHOICE).map((prod, index) => <option key={index} value={prod}>{PRODUCT_CHOICE[prod]}</option>)}
                </select>
                <button type="submit" disabled={formIsValid ? false : true} onClick={e => void handleSubmit(e)}>Submit</button>
            </form>
        </>
    )
}

export default NotifyForm