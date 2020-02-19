import Joi from 'joi'

class PageController {
    index(req, res) {
        const schema = Joi.object({
            username: Joi.string().alphanum().min(3).max(30)
                .required(),
            birth_year: Joi.number().integer().min(1900).max(2013),
        }).with('username', 'birth_year')

        try {
            const { error, value } = schema.validate({ username: 'Rafael', birth_year: 1989 })
            res.json({ error, value })
        } catch (err) {
            res.json({ err })
        }
    }
}

export default new PageController()
