import React, { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import ToolLayout from '../../../components/layout/ToolLayout/ToolLayout';
import './TimeConverter.css';

type TimeFormat = '12hour' | '24hour' | 'unix' | 'iso';
type TimeZone = string;

interface TimeState {
    format: TimeFormat;
    timezone: TimeZone;
    value: string;
}

interface TimeSectionProps {
    isSource: boolean;
    timeState: TimeState;
    onFormatChange: (format: TimeFormat, isSource: boolean) => void;
    onTimezoneChange: (timezone: TimeZone, isSource: boolean) => void;
    onTimeChange?: (value: string) => void;
    onNow?: () => void;
    onCopy: (text: string) => void;
}

const commonTimeZones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'America/Chicago',
    'America/Denver',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Asia/Dubai',
    'Australia/Sydney',
    'Pacific/Auckland'
];

const TimeSection: React.FC<TimeSectionProps> = ({
    isSource,
    timeState,
    onFormatChange,
    onTimezoneChange,
    onTimeChange,
    onNow,
    onCopy
}) => {
    const title = isSource ? 'Source' : 'Target';

    return (
        <div className={`time-section ${isSource ? 'source-section' : 'target-section'}`}>
            <div className="time-controls">
                <div className="format-selector">
                    <label>{title} Format:</label>
                    <select
                        value={timeState.format}
                        onChange={(e) => onFormatChange(e.target.value as TimeFormat, isSource)}
                    >
                        <option value="24hour">24-hour</option>
                        <option value="12hour">12-hour</option>
                        <option value="unix">Unix Timestamp</option>
                        <option value="iso">ISO 8601</option>
                    </select>
                </div>
                <div className="timezone-selector">
                    <label>{title} Timezone:</label>
                    <select
                        value={timeState.timezone}
                        onChange={(e) => onTimezoneChange(e.target.value, isSource)}
                    >
                        {commonTimeZones.map((zone) => (
                            <option key={zone} value={zone}>{zone}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="time-input">
                <input
                    type="text"
                    value={timeState.value}
                    onChange={onTimeChange ? (e) => onTimeChange(e.target.value) : undefined}
                    readOnly={!isSource}
                    placeholder={isSource ? `Enter time in ${timeState.format} format...` : 'Converted time will appear here...'}
                />
                <div className="input-buttons">
                    {isSource && onNow && (
                        <button onClick={onNow}>Now</button>
                    )}
                    <button onClick={() => onCopy(timeState.value)}>Copy</button>
                </div>
            </div>
        </div>
    );
};

const TimeConverter: React.FC = () => {
    const [sourceTime, setSourceTime] = useState<TimeState>({
        format: '24hour',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        value: ''
    });

    const [targetTime, setTargetTime] = useState<TimeState>({
        format: '12hour',
        timezone: 'UTC',
        value: ''
    });

    const formatTime = useCallback((date: Date, format: TimeFormat, timezone: TimeZone): string => {
        try {
            switch (format) {
                case '12hour':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric',
                        hour12: true
                    }).format(date);
                case '24hour':
                    return new Intl.DateTimeFormat('en-US', {
                        timeZone: timezone,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false
                    }).format(date);
                case 'unix':
                    return Math.floor(date.getTime() / 1000).toString();
                case 'iso':
                    return date.toISOString();
                default:
                    return '';
            }
        } catch (error) {
            console.error('Time formatting error:', error);
            return '';
        }
    }, []);

    const parseTime = useCallback((value: string, format: TimeFormat): Date | null => {
        try {
            switch (format) {
                case '12hour':
                case '24hour': {
                    const now = new Date();
                    const [time, period] = value.split(/\s+(AM|PM)/i);
                    const [hours, minutes, seconds] = time.split(':').map(Number);

                    if (format === '12hour' && period) {
                        const isPM = period.toUpperCase() === 'PM';
                        now.setHours(
                            isPM ? (hours % 12) + 12 : hours % 12,
                            minutes || 0,
                            seconds || 0,
                            0
                        );
                    } else {
                        now.setHours(hours, minutes || 0, seconds || 0, 0);
                    }
                    return now;
                }
                case 'unix':
                    return new Date(parseInt(value) * 1000);
                case 'iso':
                    return new Date(value);
                default:
                    return null;
            }
        } catch (error) {
            console.error('Time parsing error:', error);
            return null;
        }
    }, []);

    const handleTimeChange = useCallback((value: string) => {
        setSourceTime(currentSource => ({ ...currentSource, value }));

        const date = parseTime(value, sourceTime.format);
        if (date) {
            const result = formatTime(date, targetTime.format, targetTime.timezone);
            setTargetTime(currentTarget => ({ ...currentTarget, value: result }));
        }
    }, [sourceTime.format, targetTime.format, targetTime.timezone, parseTime, formatTime]);

    const handleFormatChange = useCallback((format: TimeFormat, isSource: boolean) => {
        if (isSource) {
            setSourceTime(currentSource => {
                const date = parseTime(currentSource.value, currentSource.format);
                if (date) {
                    const newValue = formatTime(date, format, currentSource.timezone);
                    return { ...currentSource, format, value: newValue };
                }
                return { ...currentSource, format };
            });
        } else {
            setTargetTime(currentTarget => {
                if (sourceTime.value) {
                    const date = parseTime(sourceTime.value, sourceTime.format);
                    if (date) {
                        const newValue = formatTime(date, format, currentTarget.timezone);
                        return { ...currentTarget, format, value: newValue };
                    }
                }
                return { ...currentTarget, format };
            });
        }
    }, [sourceTime, parseTime, formatTime]);

    const handleTimezoneChange = useCallback((timezone: TimeZone, isSource: boolean) => {
        if (isSource) {
            setSourceTime(currentSource => {
                if (currentSource.value) {
                    const date = parseTime(currentSource.value, currentSource.format);
                    if (date) {
                        const newValue = formatTime(date, currentSource.format, timezone);
                        return { ...currentSource, timezone, value: newValue };
                    }
                }
                return { ...currentSource, timezone };
            });
        } else {
            setTargetTime(currentTarget => {
                if (sourceTime.value) {
                    const date = parseTime(sourceTime.value, sourceTime.format);
                    if (date) {
                        const newValue = formatTime(date, currentTarget.format, timezone);
                        return { ...currentTarget, timezone, value: newValue };
                    }
                }
                return { ...currentTarget, timezone };
            });
        }
    }, [sourceTime, parseTime, formatTime]);

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success('Copied to clipboard!');
        } catch (err) {
            toast.error('Failed to copy text. Please try again.');
            console.error('Copy error:', err);
        }
    };

    const handleNow = () => {
        const now = new Date();
        const value = formatTime(now, sourceTime.format, sourceTime.timezone);
        handleTimeChange(value);
    };

    return (
        <ToolLayout
            title="Time Converter"
            description="Convert between different time formats and timezones."
        >
            <div className="time-converter">
                <TimeSection
                    isSource={true}
                    timeState={sourceTime}
                    onFormatChange={handleFormatChange}
                    onTimezoneChange={handleTimezoneChange}
                    onTimeChange={handleTimeChange}
                    onNow={handleNow}
                    onCopy={handleCopy}
                />
                <TimeSection
                    isSource={false}
                    timeState={targetTime}
                    onFormatChange={handleFormatChange}
                    onTimezoneChange={handleTimezoneChange}
                    onCopy={handleCopy}
                />
            </div>
        </ToolLayout>
    );
};

export default TimeConverter;
