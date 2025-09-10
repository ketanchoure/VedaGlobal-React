
const Quote = require("../Model/Quote");
const { mailclient } = require("../Service/Send_email");

exports.Create_quote= async (req, res) => {
    try {
    const{name,email,phone,country,quantity,message}=req.body;

    if(!name || !email || !phone){
        return res.status(400).send('fill required fields');
    }
    
      const newRequest = new Quote(req.body);
      const saved = await newRequest.save();
      await mailclient(req.body)
      res.status(201).json(saved);

      
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

exports.getallqoute= async (req, res) => {
  try {
    const requests = await Quote.find();
    res.status(200).json(requests);
    if (!requests) {
      return res.status(404).json({ message: "requests not found" });
  }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ one request by ID
exports.getallqoutebyid= async (req, res) => {
  try {
    const request = await Quote.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE a request
exports.deletequote= async (req, res) => {
  try {
    await Quote.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};