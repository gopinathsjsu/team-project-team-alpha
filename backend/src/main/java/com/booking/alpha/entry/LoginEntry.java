package com.booking.alpha.entry;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@ToString
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor
@NoArgsConstructor
public class LoginEntry {

    String emailId;

    String password;

}
