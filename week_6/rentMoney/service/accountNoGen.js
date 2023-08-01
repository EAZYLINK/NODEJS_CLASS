export const generateAccountNo = () => {
    const length = 10
    const characters = '0123456789'
    let accountNo = ''

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        accountNo += characters.charAt(randomIndex)
    }

    return accountNo
}