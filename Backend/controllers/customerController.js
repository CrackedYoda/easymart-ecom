import Customers from "../models/customer.js";


export const getCustomers = async (req, res) => {
  try {
    const customers = await Customers.find().sort("name");
    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);
    
    if (!customer) {
      return res.status(404).send("Customer not found");
    }
    
    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const addCustomer = async (req, res) => {
  try {
    // Check if customer already exists
    const existingCustomer = await Customers.findOne({ 
      phone: req.validatedData.phone 
    });
    
    if (existingCustomer) {
      return res.status(400).send("Customer with this phone already exists");
    }

    // Create new customer
    const newCustomer = new Customers({
      name: req.validatedData.name,
      phone: req.validatedData.phone,
      isGold: req.validatedData.isGold || false
    });

    await newCustomer.save();
    res.status(201).send(newCustomer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const changeCustomer = async (req, res) => { try {
    const customer = await Customers.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.validatedData.name,
          phone: req.validatedData.phone,
          isGold: req.validatedData.isGold
        }
      },
      { new: true }
    );

    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send(customer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deleteCustomer = async (req, res) => { try {
    const customer = await Customers.findByIdAndDelete(req.params.id);
    
    if (!customer) {
      return res.status(404).send("Customer not found");
    }

    res.send("Customer deleted successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
