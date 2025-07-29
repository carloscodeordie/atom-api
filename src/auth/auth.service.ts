/* eslint-disable */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { UserDto } from 'src/dtos/user.dto';

@Injectable()
export class AuthService {
  private usersCollection;

  constructor(
    private firebase: DatabaseService,
    private jwtService: JwtService,
  ) {
    this.usersCollection = this.firebase.getFirestore().collection('users');
  }

  async signup(user: UserDto) {
    const { email, password } = user;

    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (!snapshot.empty) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);

    const response = await this.usersCollection.add({
      email,
      password: hashed,
    });

    const payload = { sub: response.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }

  async signin(userDto: UserDto) {
    const { email, password } = userDto;

    const snapshot = await this.usersCollection
      .where('email', '==', email)
      .get();
    if (snapshot.empty) throw new UnauthorizedException('Invalid credentials');

    const userDoc = snapshot.docs[0];
    const user = userDoc.data();
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: userDoc.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
