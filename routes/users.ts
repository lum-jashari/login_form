import { Router, Response, Request } from "express";
import { check, validationResult } from "express-validator";
import HttpStatusCodes from "http-status-codes";
import User, { IUser, TUser } from "../models/User";
import bcrypt from "bcrypt";

const router: Router = Router();

router.post(
    "/",
    [
        check("email", "please include a valid email address").isEmail(),
        check("password", "password length should be between 6 and 12 characters").isLength({ min: 6, max: 12 }),
    ],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({ erros: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user: IUser | null = await User.findOne({ email });
            if (user) {
                return res.status(HttpStatusCodes.BAD_REQUEST).json({
                    errors: [{ msg: "user already exists" }],
                });
            }
            const salt = await bcrypt.genSalt(10);
            const hashed = await bcrypt.hash(password, salt);

            const userObj: TUser = {
                email: email,
                password: hashed,
                avatar: "",
            };
            user = new User(userObj);
            user.save().then((success) => {
                if (success) {
                    return res.status(HttpStatusCodes.CREATED).json({ msg: "you have registered succesfully, plesae log in to continue" });
                }
            });
        } catch (error: any) {}
    }
);

export default router;
