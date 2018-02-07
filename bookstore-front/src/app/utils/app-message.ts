export class AppMessage {
  private _text: string;
  private _title: string;
  private _type: string;
  private _show = false;

/*  constructor(message?: {text?: string, title?: string, type?: string, show?: boolean}) {
    if ( message ) {
      this._text = message.text;
      this._title = message.title;
      this._type = message.type;
      this._show = message.show;
    }else {
      this._show = false;
    }
  }*/

  constructor(text?: string, title?: string, type?: string, show?: boolean) {
      this._text = text;
      this._title = title;
      this._type = type;

      if ( show ) {
        this._show = show;
      }else {
        this._show = false;
      }
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get show(): boolean {
    return this._show;
  }

  set show(value: boolean) {
    this._show = value;
  }

  public static createMessage(text?: string, title?: string, type?: string, show?: boolean): AppMessage {
    return new AppMessage(text, title, type, show);
  }

}
