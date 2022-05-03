import { Component, Host, h, Prop, State, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'mt-button',
  styleUrl: 'mt-button.scss',
  shadow: true,
})
export class MtButton {

  /**
   * The color which corresponds to the state
   */
  @Prop({reflect: true}) color: 'primary' | 'warn' | 'error' = 'primary';

  /**
   * Whether the button is displayed with a label only, label and icon or icon only
   */
  @Prop() type: 'flat' | 'elevated' | 'text' = 'flat';

  /**
   * User can not interact with the element when true
   */
  @Prop({reflect: true}) disabled: string | boolean = false;

  /**
   * Tracks the times the button was clicked
   */
  @State() timesClicked: number = 0;

  /**
   * Emits when the button was clicked
   */
  @Event() clicked: EventEmitter<void>;

  /**
   * Emits when the disabled state changes
   */
  @Event() disabledChanged: EventEmitter<boolean>;


  constructor() {
    this.handleClick = this.handleClick.bind(this);
  }

  public handleClick(): void {
    if (this.disabled) return;

    this.timesClicked++;
    this.clicked.emit();
  }

  render() {
    return (
      <Host onClick={this.handleClick}>
        <span class="mt-btn-times-clicked">{this.timesClicked}</span>
        <button disabled={!!this.disabled}
                class={`
                  mt-btn
                  mt-btn-${this.color}
                  ${this.disabled && 'mt-btn-disabled'}
                  mt-btn-${this.type}
                `}
        >
          <slot></slot>
        </button>
      </Host>
    );
  }

}
