package no.hvl.dat250.jpa.assignment2;

import lombok.Setter;

import javax.persistence.*;

@Entity
@Setter
public class Pincode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pincode;

    private int count;

    public Long getId() {
        return id;
    }

    public String getPincode() {
        // TODO: implement method!
        return pincode;
    }

    public Integer getCount() {
        // TODO: implement method!
        return count;
    }
}
