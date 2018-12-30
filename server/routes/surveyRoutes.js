const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

// model
const Survey = mongoose.model('surveys');

module.exports = app => {
	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user.id }).select({ 
			recipients: false
		});

		res.send(surveys);
	});

	app.get('/api/surveys/:surveyId/thanks/:choise', (req, res) => {
		let { surveyId, choise } = req.params;
		choise = choise == 'yes' ?  {yes: 1} : {no:0};		
		Survey.findByIdAndUpdate(surveyId, choise, {new:true}, (err, survey) => {
			if (err) return res.status(500).send(err);
        	// return res.send(survey);
		});
		
		res.send('Thanks for voting!');
	});

	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;
		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients.split(',').map(email => ({ email }) ),
			_user: req.user.id,
			dateSent: Date.now()
		});

		try {
			await Mailer(recipients, subject, surveyTemplate(survey));
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save();

			res.send(user);
		} catch(err) {
			res.status(422).send(err);
		}
	});
};
