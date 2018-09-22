import {Injectable} from '@angular/core';

export class ClientToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;


  constructor(accessToken: string, refreshToken: string, expiresIn: number ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;


  }



}
