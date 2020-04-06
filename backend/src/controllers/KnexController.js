module.exports = {
  catch(res, e) {
    res.status(500).json({ no: e.errno, error: e.stack, code: e.code });
  }
};