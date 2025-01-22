import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignupUserDto } from './dto/signupUserDto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/loginUserDto';
import { Role } from './enum/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signUpUser(signupUserDto: SignupUserDto): Promise<{ token: string }> {
    const { email, username, firstName, lastName, address, password, role } =
      signupUserDto;

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      username,
      firstName,
      lastName,
      address,
      password: hashPassword,
      role: role ?? [Role.CLIENT], // Default role if none is provided
    });

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async login(loginUserDto: LoginUserDto): Promise<{ token: string }> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }
}
