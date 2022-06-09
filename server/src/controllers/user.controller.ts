import expressAsyncHandler from 'express-async-handler';
import userService, { UserService } from '../services/user.service';
type UserControllerId = { userId: string };

export class UserController {
  constructor(private readonly userService: UserService) {}

  getMyProfile = expressAsyncHandler(async (req, res) => {
    const profile = await this.userService.myProfile(req.user?.id!);
    res.status(200).json(profile);
  });

  getProfileId = expressAsyncHandler<UserControllerId>(async (req, res) => {
    const profileId = await this.userService.profileId(parseInt(req.params.userId));
    res.status(200).json(profileId);
  });
}
export default new UserController(userService);
