const siteService = require('../services/siteService');

exports.createSite = async (req, res) => {
  try {
    const site = await siteService.createSite(req.body);
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSites = async (req, res) => {
  try {
    const sites = await siteService.getAllSites();
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSiteById = async (req, res) => {
  try {
    const site = await siteService.getSiteById(req.params.id);
    res.json(site);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateSite = async (req, res) => {
  try {
    const site = await siteService.updateSite(req.params.id, req.body);
    res.json(site);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSite = async (req, res) => {
  try {
    await siteService.deleteSite(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};