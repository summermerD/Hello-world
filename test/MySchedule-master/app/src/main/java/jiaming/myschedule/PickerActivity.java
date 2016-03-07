package jiaming.myschedule;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;
import android.widget.TimePicker;

import java.util.Calendar;


public class PickerActivity extends Activity {

    Button button;
    int code = 1;
    TimePicker timePicker;

    @Override
    public void onCreate(Bundle saveInstanceState) {
        super.onCreate(saveInstanceState);
        setContentView(R.layout.activity_picker);

        Calendar mcurrentTime = Calendar.getInstance();
        int mHour = mcurrentTime.get(Calendar.HOUR);
        int mMinute = mcurrentTime.get(Calendar.MINUTE);

        timePicker = (TimePicker)findViewById(R.id.timePicker1);

        Intent data = new Intent();
        data.putExtra("Hour", Integer.toString(mHour));
        data.putExtra("Minute", Integer.toString(mMinute));
        setResult(RESULT_OK,data);

        addListenerOnButton();



    }


    public void addListenerOnButton() {

        final Context context = this;

        button = (Button) findViewById(R.id.submit);

        button.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View v) {

                finish();
            }
        });

    }

//
//    private TextView tvDisplayTime;
//    private TimePicker timePicker1;
//    private int hour;
//    private int minute;
//
//
//    private void setCurrentTimeOnView() {
//
//        tvDisplayTime = (TextView) findViewById(R.id.tvTime);
//        timePicker1 = (TimePicker) findViewById(R.id.timePicker1);
//
//        final Calendar c = Calendar.getInstance();
//        hour = c.get(Calendar.HOUR_OF_DAY);
//        minute = c.get(Calendar.MINUTE);
//
//        tvDisplayTime.setText(new StringBuilder().append(pad(hour)).append(":").append(pad(minute)));
//
//        timePicker1 = setCurrentHour(hour);
//        timePicker1 = setCurrentMinute(minute);
//
//    }

//    private static String pad(int c) {
//        if (c >= 10)
//            return String.valueOf(c);
//        else
//            return "0" + String.valueOf(c);
//    }



//
//    <TextView
//    android:id="@+id/lblTime"
//    android:layout_width="wrap_content"
//    android:layout_height="wrap_content"
//    android:text="Current Time (H:M):"
//    android:textAppearance="?android:attr/textAppearanceLarge"/>
//
//    <TextView
//    android:layout_width="wrap_content"
//    android:layout_height="wrap_content"
//    android:id="@+id/tvTime"
//    android:text=""
//    android:textAppearance="?android:attr/textAppearanceLarge"/>



}
