const smsCallback = (req, res) => {
    res.status(200).send()
  
    try {
      console.log('--> SMS Callback Body: ', req.body)
    } catch (error) {
      console.log('Error while sending SMS: ', error)
    }
  }
  
  module.exports = { smsCallback }
  