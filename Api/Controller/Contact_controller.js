const { Contact } = require("../Model/Contact_us");
const { mailUserContact } = require("../Service/Send_email");

exports.Create_contact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject) {
            return res.status(400).send('fill required fields');
        }

        const newContact = new Contact(req.body);
        const saved = await newContact.save();

        // Send emails
        await mailUserContact(saved);   // to user


        res.status(201).json({ message: 'Message sent successfully.' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getallcontact= async (req, res) => {
    try {
      const requests = await Contact.find();
      res.status(200).json(requests);
      if (!requests) {
        return res.status(404).json({ message: "requests not found" });
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // READ one request by ID
  exports.getallcontactbyid= async (req, res) => {
    try {
      const request = await Contact.findById(req.params.id);
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.status(200).json(request);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  // DELETE a request
  exports.deletecontact= async (req, res) => {
    try {
      await Contact.findByIdAndDelete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };