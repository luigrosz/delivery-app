const validateStatusMod = async (req, res, next) => {
    const { role } = req.user;
    const { status } = req.body;
    try {
      if (role === 'customer' && status === 'Preparando') {
        res.status(401).json({ error: 'Your not allowed to do that' });
      }
      if (status === 'Pendente') {
        res.status(401).json({ error: 'This status is not allowed' });
      }
      return next();
    } catch (error) {
      return res.status(500).json({ error: 'Failed to authenticate token.' });
    }
};

module.exports = validateStatusMod;